import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import { prisma } from "../prisma/client";

// REGISTER USER
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: "Missing fields" });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: "Password too short" });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: "Email already in use" });
    }
    console.log("REGISTER BODY:", req.body);

    console.log('before hashing')
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('after hashsing')
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name, role: "User" },
    });
    console.log('after insertion')
    res.status(201).json({
      message: "User Registered",
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
};

// LOGIN USER
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET) {
      throw new Error("JWT secrets not set");
    }

    // FINAL FIX: Force-cast expiresIn so TS stops complaining
    const accessTokenOptions: SignOptions = {
      expiresIn: (process.env.ACCESS_TOKEN_EXPIRES || "15m") as any,
    };

    const refreshTokenOptions: SignOptions = {
      expiresIn: (process.env.REFRESH_TOKEN_EXPIRES || "7d") as any,
    };

    const accessToken = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_ACCESS_SECRET as string,
      accessTokenOptions
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_REFRESH_SECRET as string,
      refreshTokenOptions
    );

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    const isProd = process.env.NODE_ENV === "production";

    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: isProd,
        sameSite: "lax",
        maxAge: 15 * 60 * 1000,
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: isProd,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: "Login successful",
        user: { id: user.id, email: user.email, name: user.name, role: user.role },
      });
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
};

// LOGOUT USER
export const logoutUser = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.userId;

    if (userId) {
      await prisma.user.update({
        where: { id: userId },
        data: { refreshToken: null },
      });
    }

    const isProd = process.env.NODE_ENV === "production";

    res
      .clearCookie("accessToken", { httpOnly: true, secure: isProd, sameSite: "strict" })
      .clearCookie("refreshToken", { httpOnly: true, secure: isProd, sameSite: "strict" })
      .json({ message: "Logged out" });
  } catch (error) {
    res.status(500).json({ message: "Error logging out" });
  }
};

// GET AUTHENTICATED USER
export const getMe = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.userId;
    if (!userId) return res.status(401).json({ message: "Not authorized" });

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true, role: true },
    });

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user" });
  }
};

// REFRESH TOKEN
export const refreshTokenHandler = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    if (!process.env.JWT_REFRESH_SECRET || !process.env.JWT_ACCESS_SECRET) {
      throw new Error("JWT secrets not set");
    }

    let decoded: any;
    try {
      decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string);
    } catch (error) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({ message: "Refresh token not recognized" });
    }

    const newAccessTokenOptions: SignOptions = {
      expiresIn: (process.env.ACCESS_TOKEN_EXPIRES || "15m") as any,
    };

    const newAccessToken = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_ACCESS_SECRET as string,
      newAccessTokenOptions
    );

    const isProd = process.env.NODE_ENV === "production";

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    return res.json({ message: "Access token refreshed" });
  } catch (error) {
    console.error("Refresh error:", error);
    return res.status(500).json({ message: "Error refreshing token" });
  }
};

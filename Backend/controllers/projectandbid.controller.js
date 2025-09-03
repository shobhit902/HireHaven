import { Project } from "../models/project.model.js";

import { Bid } from "../models/bid.model.js";

import { Invite } from "../models/invite.model.js";

import crypto from "crypto";
export const createProject = async (req, res) => {
  try {
    if (!req.body) {
      return res
        .status(400)
        .json({ success: false, message: "Request body is missing" });
    }

    const { title, description, skills, budgetMin, budgetMax, type } = req.body;

    if (
      !title ||
      !description ||
      !skills ||
      !budgetMin ||
      !budgetMax ||
      !type
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    console.log(title, description, skills, budgetMin, budgetMax, type);

    const project = new Project({
      title,
      description,
      skills,
      budgetMin,
      budgetMax,
      type,
    });
    await project.save();

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getProjects = async (req, res) => {
  try {
    const { type } = req.query;
    const query = {};
    if (type) query.type = type;

    const projects = await Project.find(query);

    res.status(200).json({ success: true, projects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createBid = async (req, res) => {
  try {
    const { projectId, freelancerId, amount, proposal } = req.body;
    console.log(req.body);
    if (!projectId || !freelancerId || !amount || !proposal) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const project = Project.findById(projectId);
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    const existingBid = await Bid.findOne({ projectId, freelancerId });

    if (existingBid) {
      return res
        .status(400)
        .json({ success: false, message: "Bid already exists" });
    }

    const bid = new Bid({ projectId, freelancerId, amount, proposal });
    await bid.save();

    return res
      .status(201)
      .json({ success: true, message: "Bid created successfully", bid });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getBids = async (req, res) => {
  try {
    const { projectId } = req.params;
    if (!projectId) {
      return res.status(400).json({
        success: false,
        message: "Project ID is required  or Product doesn't exist",
      });
    }
    const bids = await Bid.find({ projectId }).populate(
      "freelancerId",
      "name email skills"
    );

    return res.status(200).json({ success: true, bids });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createInvite = async (req, res) => {
  const { projectId, email, invitedBy, description } = req.body;
  try {
    if (!projectId || !email || !invitedBy) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const project = await Project.findById(projectId);
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }
    const token = crypto.randomBytes(20).toString("hex");
    const expiresAt = Date.now() + 3600000 * 24; // 24 hours
    const invite = new Invite({
      projectId,
      email,
      invitedBy,
      description,
      token,
      expiresAt,
    });
    await invite.save();
    return res
      .status(201)
      .json({ success: true, message: "Invite created successfully", invite });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const acceptInvite = async (req, res) => {
  const { token } = req.body;
  try {
    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "Token is required" });
    }
    const invite = await Invite.findOne({ token });
    if (!invite) {
      return res
        .status(404)
        .json({ success: false, message: "Invite not found" });
    }
    if (invite.expiresAt < Date.now()) {
      return res
        .status(400)
        .json({ success: false, message: "Invite has expired" });
    }

    invite.status = "accepted";
    await invite.save();

    return res.status(200).json({
      success: true,
      message: "Invite accepted successfully",
      invite: {
        ...invite._doc,
        token: undefined,
        expiresAt: undefined,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

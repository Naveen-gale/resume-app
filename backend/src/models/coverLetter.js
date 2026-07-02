import mongoose from "mongoose";

const coverLetterSchema = new mongoose.Schema(
  {
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
    profileName: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    company: {
      type: String,
    },
    jobDescription: {
      type: String,
    },
    generatedCoverLetter: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
);

const CoverLetter = mongoose.model("CoverLetter", coverLetterSchema);
export default CoverLetter;
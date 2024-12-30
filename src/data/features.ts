const dev = process.env.NODE_ENV !== "production";

export const features = {
  canSeeNonprofitReadMore: dev,
  canSeeExperienceReadMore: dev,
  canSeeProjectsReadMore: dev,
  enableSocialCardColor: false,
};

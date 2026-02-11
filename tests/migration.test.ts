import { describe, expect, it } from "vitest";
import { createActivity } from "../packages/activities";
import { buildActivityUrl } from "../packages/curriculum";

describe("Post-migration validation", () => {
  it("Lecture phoneme activity still valid", () => {
    const activity = createActivity("initiation-lecture-ecriture:phoneme", {
      phoneme: "a",
      level: "cp"
    });

    expect(activity.metadata.trackId).toBe("initiation-lecture-ecriture");

    const content = activity.createContent();
    expect(content).toHaveProperty("phonemeId");
  });

  it("builds canonical lecture URL", () => {
    const url = buildActivityUrl({
      domainId: "langue",
      trackId: "initiation-lecture-ecriture",
      levelId: "cp",
      activityType: "phoneme",
      params: { phoneme: "a" }
    });

    expect(url).toBe(
      "/domain/langue/track/initiation-lecture-ecriture/level/cp/activity/phoneme?phoneme=a"
    );
  });
});

import { test, expect } from "@playwright/test";

test("complete journey: Pip, lamps, map, story, wishes, secret and modes", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "I build the dreams",
  );
  const pip = page.getByRole("button", { name: "Say hello to Pip" });
  await pip.hover({ position: { x: 200, y: 150 } });
  await expect(pip.locator("svg.pip")).toHaveAttribute("style", /--eye-x/);
  await pip.click();
  await expect(page.locator(".pip-caption")).toContainText("tickles");
  await page.getByRole("button", { name: "Lilac cloud" }).click();
  await expect(
    page.getByRole("button", { name: "Lilac cloud" }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".nightlights")).toHaveAttribute(
    "style",
    /#c1b0ed/,
  );
  await page.getByRole("slider", { name: "Glow" }).fill("25");
  await expect(page.locator(".brightness output")).toHaveText("25%");
  await page
    .getByRole("button", { name: "Visit Little Ghost’s Attic" })
    .click();
  await expect(page.locator(".delivery-ticket")).toContainText("tap shoes");
  await expect(
    page.getByRole("button", { name: "Previous", exact: false }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "Next page" }).click();
  await expect(page.locator(".book-text h4")).toHaveText("A window, far below");
  await page.locator(".open-book").focus();
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("button", { name: "Next page" })).toBeDisabled();
  await page.getByRole("button", { name: "Open the window" }).click();
  await expect(page.locator(".room")).toHaveClass(/window-open/);
  await page.getByRole("button", { name: "Wake Mallow" }).click();
  await expect(page.locator(".pip-dialogue")).toContainText(
    "doing wonderfully",
  );
  await page.getByRole("button", { name: "Connect the stars" }).click();
  await expect(page.locator(".pip-dialogue")).toContainText("numbered stars");
  await page.getByRole("button", { name: "Dim the moon" }).click();
  await expect(page.locator(".room")).not.toHaveClass(/room-lit/);
  await page.getByRole("button", { name: "Meet Captain Button" }).click();
  await expect(page.locator(".pip-dialogue")).toContainText("cuddles");
  await page.getByRole("button", { name: "Send to the stars" }).click();
  await expect(page.locator("#wish-feedback")).toContainText(
    "please write one",
  );
  await page
    .locator("#wish")
    .fill("<img src=x onerror=alert(1)> a sea of stars");
  await page.getByRole("button", { name: "Send to the stars" }).click();
  await expect(page.locator(".wishes blockquote")).toContainText("<img src=x");
  await expect(page.locator(".wishes img")).toHaveCount(0);
  await page.reload();
  await expect(page.locator(".wishes blockquote")).toContainText(
    "a sea of stars",
  );
  await page.getByRole("button", { name: "Collect secret star 2" }).click();
  await expect(page.locator(".secret-clue")).toContainText(
    "start with star 01",
  );
  for (const n of [1, 2, 3])
    await page
      .getByRole("button", { name: `Collect secret star ${n}` })
      .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await page.getByRole("button", { name: "Chaos off" }).click();
  await expect(page.locator(".app")).toHaveClass(/chaos/);
  await page.getByRole("button", { name: "Chaos on" }).click();
  await page.getByRole("button", { name: "Dawn mood" }).click();
  await expect(page.locator(".app")).toHaveClass(/dawn/);
  expect(errors).toEqual([]);
});

test("real Web Audio starts, stops, and global mute silences active voices", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const Native = window.AudioContext;
    const stats = { contexts: [] as AudioContext[], active: 0, starts: 0 };
    Object.assign(window, { audioStats: stats });
    window.AudioContext = class extends Native {
      constructor(options?: AudioContextOptions) {
        super(options);
        stats.contexts.push(this);
      }
      createOscillator() {
        const osc = super.createOscillator();
        const start = osc.start.bind(osc);
        osc.start = (when?: number) => {
          stats.active++;
          stats.starts++;
          start(when);
        };
        osc.addEventListener("ended", () => stats.active--);
        return osc;
      }
    };
  });
  await page.goto("/");
  const stats = () =>
    page.evaluate(() => {
      const s = (
        window as unknown as {
          audioStats: {
            contexts: AudioContext[];
            active: number;
            starts: number;
          };
        }
      ).audioStats;
      return {
        active: s.active,
        starts: s.starts,
        states: s.contexts.map((c) => c.state),
      };
    });
  expect((await stats()).starts).toBe(0);
  await page.getByRole("button", { name: "Wind & play" }).click();
  await expect(
    page.getByRole("button", { name: "Lullaby playing" }),
  ).toBeDisabled();
  await expect.poll(async () => (await stats()).starts).toBeGreaterThan(0);
  expect((await stats()).states).toContain("running");
  await page.getByRole("button", { name: "Stop lullaby", exact: true }).click();
  await expect.poll(async () => (await stats()).active).toBe(0);
  const stopped = (await stats()).starts;
  await page.waitForTimeout(1100);
  expect((await stats()).starts).toBe(stopped);
  await page.getByRole("button", { name: "Wind & play" }).click();
  await page.getByRole("button", { name: "Mute all sound" }).click();
  await expect.poll(async () => (await stats()).active).toBe(0);
  const muted = (await stats()).starts;
  await page.getByRole("button", { name: "Say hello to Pip" }).click();
  await page.waitForTimeout(1100);
  expect((await stats()).starts).toBe(muted);
  await page.getByRole("button", { name: "Wind the music box" }).click();
  await expect(
    page.getByRole("button", { name: "Stop the music" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Stop the music" }).click();
  await expect.poll(async () => (await stats()).active).toBe(0);
});

for (const [width, height] of [
  [1440, 900],
  [1280, 720],
  [768, 1024],
  [390, 844],
  [360, 800],
]) {
  test(`layout and chaos mode have no horizontal overflow at ${width}x${height}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    for (const selector of [
      ".hero-copy",
      ".pip-button",
      ".workshop-grid",
      ".map",
      ".open-book",
      ".room",
      ".wish-paper",
    ]) {
      const rect = await page.locator(selector).boundingBox();
      expect(rect!.x, selector).toBeGreaterThanOrEqual(-1);
      expect(rect!.x + rect!.width, selector).toBeLessThanOrEqual(width + 1);
    }
    await page.screenshot({ path: `test-results/${width}-hero.png` });
    await page.locator("#workshop").scrollIntoViewIfNeeded();
    await page.screenshot({ path: `test-results/${width}-workshop.png` });
    await page.getByRole("button", { name: "Chaos off" }).click();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.getByRole("button", { name: "Visit Moonflower Mill" }).click();
    await expect(page.locator(".delivery-ticket")).toContainText("tiny moons");
  });
}

test("reduced motion, keyboard entry and blocked storage stay usable", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript(() => {
    Storage.prototype.setItem = () => {
      throw new DOMException("blocked");
    };
  });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to the dream bureau" }),
  ).toBeFocused();
  expect(
    await page
      .locator(".pip-body")
      .first()
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
  await page.locator("#wish").fill("A safe little dream");
  await page.getByRole("button", { name: "Send to the stars" }).click();
  await expect(page.locator("#wish-feedback")).toContainText(
    "storage is unavailable",
  );
  await expect(page.locator(".wishes")).toContainText("A safe little dream");
});

test("touch Pip, swipe story and unlock secret on a phone", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
  });
  const page = await context.newPage();
  await page.goto(process.env.PIP_TEST_URL || "http://127.0.0.1:5173");
  await page.getByRole("button", { name: "Say hello to Pip" }).tap();
  await expect(page.locator(".pip-caption")).toContainText("tickles");
  const book = page.locator(".open-book");
  await book.dispatchEvent("touchstart", { touches: [{ identifier: 1, clientX: 280 }] });
  await book.dispatchEvent("touchend", { changedTouches: [{ identifier: 1, clientX: 90 }] });
  await expect(page.locator(".book-text h4")).toHaveText("A window, far below");
  for (const n of [1, 2, 3])
    await page.getByRole("button", { name: `Collect secret star ${n}` }).tap();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("button", { name: "Return to the nursery" }).tap();
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await context.close();
});

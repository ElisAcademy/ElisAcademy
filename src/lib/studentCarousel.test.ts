import assert from "node:assert/strict";
import test from "node:test";
import { repeatForCarousel } from "./studentCarousel.ts";

test("repeats a short student list through the minimum visible card count", () => {
    assert.deepEqual(repeatForCarousel(["A", "B"], 5), ["A", "B", "A", "B", "A", "B"]);
});

test("keeps an empty student list empty", () => {
    assert.deepEqual(repeatForCarousel([], 5), []);
});

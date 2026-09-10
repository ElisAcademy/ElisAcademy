import assert from "node:assert/strict";
import test from "node:test";
import { getStudentType } from "./studentType.ts";

test("maps only Honor Roll entries into the Honor Roll group", () => {
    assert.equal(getStudentType("Honor Roll"), "Honor Roll");
    assert.equal(getStudentType("Student"), "Student");
    assert.equal(getStudentType(undefined), "Student");
});

export type StudentType = "Honor Roll" | "Student";

export function getStudentType(value?: string): StudentType {
    return value?.trim().toLowerCase() === "honor roll" ? "Honor Roll" : "Student";
}

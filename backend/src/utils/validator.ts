export function validateData(modelSchema: any, data: any) {
  // ❌ Model doesn't exist
  if (!modelSchema) {
    return { valid: false, error: "Invalid model" };
  }

  // ❌ Data is not an object
  if (typeof data !== "object" || data === null) {
    return { valid: false, error: "Invalid data format" };
  }

  // 🔍 Check for unknown fields
  for (const key in data) {
    if (!modelSchema[key]) {
      return { valid: false, error: `Unknown field: ${key}` };
    }

    // 🔍 Optional: type checking (basic)
    const expectedType = modelSchema[key];
    const actualType = typeof data[key];

    if (actualType !== expectedType) {
      return {
        valid: false,
        error: `Invalid type for ${key}. Expected ${expectedType}, got ${actualType}`
      };
    }
  }

  // ✅ All checks passed
  return { valid: true };
}

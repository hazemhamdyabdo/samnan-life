export const useFormData = (obj, form = new FormData(), namespace = "") => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const formKey = namespace ? `${namespace}[${key}]` : key;

      if (Array.isArray(obj[key])) {
        // Handle arrays
        obj[key].forEach((value, index) => {
          const arrayKey = `${formKey}[${index}]`;
          if (value instanceof File || value instanceof Blob) {
            form.append(arrayKey, value, value.name || `file-${index}`);
          } else if (typeof value === "object" && value !== null) {
            useFormData(value, form, arrayKey); // Recursively handle nested objects/arrays
          } else {
            form.append(arrayKey, value);
          }
        });
      } else if (obj[key] instanceof File || obj[key] instanceof Blob) {
        // Handle File or Blob objects
        form.append(formKey, obj[key], obj[key].name || "file");
      } else if (typeof obj[key] === "object" && obj[key] !== null) {
        // Handle nested objects
        useFormData(obj[key], form, formKey);
      } else {
        // Handle primitive values
        form.append(formKey, obj[key]);
      }
    }
  }

  return form;
};

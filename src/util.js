export function buildSpecifications(array1, array2) {
  let specifications = {};

  // Iterate over array1 to build the structure with filter values
  array1.forEach((filter) => {
    const {
      categoryId,
      categoryValue,
      specKeyId,
      specKey,
      value: filterValue,
      _id: filterId,
    } = filter;

    // Initialize the category if it does not exist in the specifications object
    if (!specifications[categoryId]) {
      specifications[categoryId] = {
        categoryId,
        categoryValue,
        specs: [],
      };
    }

    // Check if a spec with the same specKeyId already exists in the specifications object
    let spec = specifications[categoryId].specs.find(
      (s) => s.specKeyId === specKeyId
    );

    if (!spec) {
      // If not, add a new spec with the filter value
      spec = {
        specKeyId,
        specKey,
        value: "", // Default to an empty string; will be updated if a custom value is found later
        filterValues: [],
      };
      specifications[categoryId].specs.push(spec);
    }

    // Add the filter value to the filterValues array
    spec.filterValues.push({
      filterId,
      filterValue,
    });
  });

  // Iterate over array2 to add or update custom values in the structure
  array2.forEach((custom) => {
    const {
      categoryId,
      categoryValue,
      specKeyId,
      specKey,
      value: customValue,
    } = custom;

    // Initialize the category if it does not exist in the specifications object
    if (!specifications[categoryId]) {
      specifications[categoryId] = {
        categoryId,
        categoryValue,
        specs: [],
      };
    }

    // Check if a spec with the same specKeyId already exists in the specifications object
    let spec = specifications[categoryId].specs.find(
      (s) => s.specKeyId === specKeyId
    );

    if (!spec) {
      // If not, add a new spec with the custom value and an empty filterValues array
      spec = {
        specKeyId,
        specKey,
        value: customValue || "",
        filterValues: [],
      };
      specifications[categoryId].specs.push(spec);
    } else {
      // If it exists, update the value with the custom value (if provided)
      spec.value = customValue || spec.value;
    }
  });

  // Convert the specifications object back into an array
  return Object.values(specifications);
}

export function reverseSpecifications(specifications) {
  let array1 = [];
  let array2 = [];

  // Iterate through each category in specifications
  for (const index in specifications) {
    const { categoryValue, specs, categoryId } = specifications[index];

    // Iterate through each spec
    specs.forEach((spec) => {
      const { specKeyId, specKey, value, filterValues } = spec;

      // Create filter objects for array1
      filterValues.forEach((filter) => {
        array1.push({
          categoryId,
          categoryValue,
          specKeyId,
          specKey,
          value: filter.filterValue,
          _id: filter.filterId, // Assuming filterId is the ID used in the original array
        });
      });

      // Create custom value object for array2 if value exists
      if (value) {
        array2.push({
          categoryId,
          categoryValue,
          specKeyId,
          specKey,
          value: value,
        });
      }
    });
  }

  return { array1, array2 };
}

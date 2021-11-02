/**
 * A simple parser that parses data in JSON:API format to a simple nested object.
 */
export function parseJsonApi(jsonApiData) {
  const data = jsonApiData.data || [];
  const included = jsonApiData.included || [];

  // Currently we expect mostly correct format with features limited to the test data.
  // In a real use case we would add missing features (errors, links, etc.) or better
  // use an existing library. I did a quick search but I haven't found a library
  // I would like, so I just created this simple parser.
  return data.map(transformObject);

  function transformObject(jsonApiObject) {
    return {
      id: jsonApiObject.id,
      type: jsonApiObject.type,
      ...jsonApiObject.attributes,
      ...transformRelationships(jsonApiObject.relationships),
    };
  }

  function transformRelationships(relationships) {
    return objectMap(relationships || {}, getRelatedObjects);
  }

  function getRelatedObjects(relationship) {
    if (!('data' in relationship)) {
      // We don't support other relationship types (links/meta).
      throw new Error(`Unknown relationship format ${JSON.stringify(relationship)}`);
    }

    const resourceLinkage = relationship.data;

    if (Array.isArray(resourceLinkage)) {
      return resourceLinkage.map((obj) => findIncludedObject(obj.id, obj.type));
    } else if (resourceLinkage) {
      return findIncludedObject(resourceLinkage.id, resourceLinkage.type);
    }
    return null;
  }

  function findIncludedObject(id, type) {
    const includedObject = included.find((object) => object.id === id && object.type === type);
    if (!includedObject) {
      throw new Error(`Cannot find included object of id=${id}, type=${type}`);
    }
    return transformObject(includedObject);
  }
}

// Map values of the specified object using the specified function (like Array.map, but for objects).
function objectMap(obj, mapFn) {
  return Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, mapFn(value)]));
}

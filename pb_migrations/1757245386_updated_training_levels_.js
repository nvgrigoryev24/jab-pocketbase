/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2389905351")

  // update collection data
  unmarshal({
    "name": "training_levels"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2389905351")

  // update collection data
  unmarshal({
    "name": "training_levels_"
  }, collection)

  return app.save(collection)
})

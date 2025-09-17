/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1740924970")

  // update collection data
  unmarshal({
    "name": "color_theme"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1740924970")

  // update collection data
  unmarshal({
    "name": "color_themes"
  }, collection)

  return app.save(collection)
})

/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3099622531")

  // remove field
  collection.fields.removeById("text1716930793")

  // remove field
  collection.fields.removeById("text3830517522")

  // remove field
  collection.fields.removeById("text838056192")

  // add field
  collection.fields.addAt(3, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1740924970",
    "hidden": false,
    "id": "relation3870930362",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "color_theme",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3099622531")

  // add field
  collection.fields.addAt(3, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text1716930793",
    "max": 0,
    "min": 0,
    "name": "color",
    "pattern": "^#[0-9A-Fa-f]{6}$",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text3830517522",
    "max": 0,
    "min": 0,
    "name": "bg_color",
    "pattern": "^#[0-9A-Fa-f]{6}$",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(5, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text838056192",
    "max": 0,
    "min": 0,
    "name": "border_color",
    "pattern": "^#[0-9A-Fa-f]{6}$",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  // remove field
  collection.fields.removeById("relation3870930362")

  return app.save(collection)
})

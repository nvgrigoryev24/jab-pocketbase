/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3431616908")

  // update field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "file2601653642",
    "maxSelect": 1,
    "maxSize": 0,
    "mimeTypes": [
      "image/jpeg",
      "image/png",
      "image/svg+xml",
      "image/gif",
      "image/webp"
    ],
    "name": "icon",
    "presentable": false,
    "protected": false,
    "required": true,
    "system": false,
    "thumbs": [
      "64x64"
    ],
    "type": "file"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3431616908")

  // update field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "file2601653642",
    "maxSelect": 1,
    "maxSize": 0,
    "mimeTypes": [
      "image/jpeg",
      "image/png",
      "image/svg+xml",
      "image/gif",
      "image/webp"
    ],
    "name": "icon",
    "presentable": false,
    "protected": false,
    "required": true,
    "system": false,
    "thumbs": [
      "32x32"
    ],
    "type": "file"
  }))

  return app.save(collection)
})

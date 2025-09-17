/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_443959778")

  // remove field
  collection.fields.removeById("select2599078931")

  // add field
  collection.fields.addAt(8, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_2389905351",
    "hidden": false,
    "id": "relation2599078931",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "level",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_443959778")

  // add field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "select2599078931",
    "maxSelect": 1,
    "name": "level",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "select",
    "values": [
      "Начинающие",
      "Соревновательные",
      "Ветераны",
      "Все уровни"
    ]
  }))

  // remove field
  collection.fields.removeById("relation2599078931")

  return app.save(collection)
})

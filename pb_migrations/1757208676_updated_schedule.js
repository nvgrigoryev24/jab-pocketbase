/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_443959778")

  // remove field
  collection.fields.removeById("date2862495610")

  // remove field
  collection.fields.removeById("bool1555377130")

  // update field
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

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_443959778")

  // add field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "date2862495610",
    "max": "",
    "min": "",
    "name": "date",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  // add field
  collection.fields.addAt(8, new Field({
    "hidden": false,
    "id": "bool1555377130",
    "name": "is_repeatable",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  // update field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "select2599078931",
    "maxSelect": 4,
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

  return app.save(collection)
})

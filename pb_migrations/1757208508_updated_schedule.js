/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_443959778")

  // update field
  collection.fields.addAt(1, new Field({
    "hidden": false,
    "id": "select3852478864",
    "maxSelect": 1,
    "name": "day",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "select",
    "values": [
      "Понедельник",
      "Вторник",
      "Среда",
      "Четверг",
      "Пятница",
      "Суббота",
      "Воскресенье"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_443959778")

  // update field
  collection.fields.addAt(1, new Field({
    "hidden": false,
    "id": "select3852478864",
    "maxSelect": 7,
    "name": "day",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "select",
    "values": [
      "Понедельник",
      "Вторник",
      "Среда",
      "Четверг",
      "Пятница",
      "Суббота",
      "Воскресенье"
    ]
  }))

  return app.save(collection)
})

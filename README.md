```
После клоинрования ставим зависимости: make setup
Создаем и наполняем базу данных: make seed
Запуск сервера: make server
Запуск фронта: make frontend
При необходимости рефрешнуть список пользователей: останавливаем сервер и прописываем make refresh
```

Server side функции лежат в `/services/clientService.js`

Реакт компоненты лежат в `/src/components/`

Искренне прошу писать функции хелперы в `/utility`

Вы сделали изменения и хотите их запушить? Прекрасно! Создайте отдельную ветку и запуште туда, не лейте все сразу в `main`

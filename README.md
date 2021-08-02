![License](https://img.shields.io/github/license/p12s/auction-house)

**Внимание:** *Тестовое задание навеяно проектом Deworker.pro, за основу взята компания "Российский Аукционный Дом". Для обучения и тренировки, попробовал решить его в меру своего понимания. На ревью не отправлял, за оптимальность не ручаюсь.*

# Упрощенная версия онлайн-аукциона.

## Задача
Реализовать упрощенную версию онлайн-аукциона.     
Подробнее [здесь](task.md)

## Выполнение
```
COMPOSE_PROJECT_NAME=auction docker-compose up -d
```

## Реализовать функциональные возможности
- ❌ Автоматическое обновление новых цен у всех пользователей в браузере
- ❌ Постановка заявок в очередь
- ❌ Простейший фронтенд

## Реализовать технические моменты
- ❌ Формат маршрутов для доступа к методам, а также формат ответа и запросов
- ❌ Спроектировать базу данных + реализовать скрипт ее формирования
- ❌ Реализовать API согласно ТЗ
- ❌ Подготовить тестовые данные (дамп базы, скрипт для генерации тестового набора данных)
- ❌ Инструкцию развертывания на локальной машине

## Используемые технологии
- ✅ Язык:  Go (желательно) или PHP
  **Go**
- ❌ Использование очередей (например, RabbitMQ)
- ✅ Логирование ошибок на проде с помощью [Sentry](https://sentry.io) (на реальном продакшене можно использовать платный аккаунт, либо развернуть этот сервис на [своей виртуалке](https://develop.sentry.dev/self-hosted/))

## Усложнения
- ❌ Предоставление API на websocket
- ❌ Пример gRPC-клиента, работающего с этим апи
- ❌ Возможность скейлинга (например, с помощью docker-swarm, а еще лучше - minikube/k8s)

## Добавил от себя
- ✅ Провиженинг проекта на YandexCloud с помощью Ansible
- ✅ Continues Integration с помощью GitHub
- ✅ Continues Delivery на прод с помощью GitLab CI
- ✅ Continues deployment на домен auction.p12s.online

## Что можно улучшить
- Вместо хранения БД средствами Docker volumes использовать БД в YC
- Покрыть код unit-тестами (пока только интеграционные - с помощью postman)
- Проверить, как работают индексы в БД под нагрузкой, убедиться в оптимальности
- Забенчмаркать с помощью wrk для проверки производительности
- Отпрофилировать с помощью pprof и по-возможности, зарефакторить. А после снова забенчмаркать  

# Дипломный проект по профессии «Fullstack-разработчик на Python»

[![Server Backend Django application MyCloud](https://github.com/berson969/diplom-mycloud/actions/workflows/backend.yaml/badge.svg?branch=main&event=deployment_status)](https://github.com/berson969/diplom-mycloud/actions/workflows/backend.yaml)

[![Deploy React Frontend](https://github.com/berson969/diplom-mycloud/actions/workflows/frontend.yaml/badge.svg?branch=gh-pages&event=deployment)](https://github.com/berson969/diplom-mycloud/actions/workflows/frontend.yaml)

## Облачное хранилище My Cloud

### Структура проекта
В папке `backend` лежат исходники для серверной части. Она собрана на базе приложения Джанго и базы данных `PostgreSQL`

В папке `frontend` лежат исходники клиентской части. Она сделана в приложении Vite на базе React+Redux. Для написания запросов к API использован RTK Query.
Стейты хранятся в слайсе. В самом стейте находятся currentUser, а также состояние приложения

Авторизация осуществляется с помощью стандартного пользователя Джанго, с помощью стандартной сессии. На стороне клиента данные хранятся в store и также в sessionStorage

### Реализация проекта
На данный момент реализовано:
 - функционал серверной части (фактически все работает, только в процессе требуется определенная доработка )
 - проверка работоспособности осуществляется с помощью uni-тестов
 - клиентская часть реализован весь необходимый функционал, кроме
            - редактирование файлов (реализовано)
            - использование просмотра хранилища от имени администратора (реализовано)
            - редактирование пользователей (реализовано)
            - при удалении файла, удаляется запись в БД но не удаляется сам файл из хранилища (реализовано)
- для деплоя пока только сама база postgreSQL используется docker-compose, все остальное только локально

На 14/6/24 реализована вся логика , которую хотел реализовать.
Остается вопрос с деплоем


### Запуск проекта

***ИЗМЕНЕНО*** На данный момент реализованна только возможность локального запуска



1. Создать файл `.env` и установить необходимые переменные. Он должен находится в папке `backend/`

```
DB_BASE=
DB_HOST=
DB_PORT=5432
DB_USER=
DB_PASS=
DJANGO_SETTINGS_MODULE=mycloud.settings
SECRET_KEY=
DEBUG=
ALLOWED_HOSTS=*
```

***ИЗМЕНЕНО*** Теперь можно использовать `docker-compose.yml` , который запустит приложение на localhost через прокси по 80 порту.
Если есть необходимость в заведении пользователя с правами администратора тогда
```$ docker-compose exec backend-server python manage.py createsuperuser```


***УСТАРЕЛО*** так тоже работает, но уже есть более простой способ
Для локального запуска бекенда нужно.
Предполагается разворачивание на локальном хосте и наличие python3.10 и NodeJS

2. Запустить контейнер с базой данных

```
docker-compose -f docker-compose-DB.yml up --build
```

3. Устанавливаем и запускаем само приложение

```
# переходим в папку бекенда
cd backend/

# создание и активация виртуального окружения
python3 -m venv venv
source venv/bin/activate

# устанавливаем зависимости
pip install -r requirements.txt

# делаем миграции
python manage.py migrate

# запускаем тесты
python manage.py test

# создаем административного пользователя
python manage.py createsuperuser

# запускаем приложение
python manage.py runserver localhost:8000
```





Для локального запуска фроненд приложения необходимо

1. перейти в папку `frontend`
`cd frontend/`
2. установить зависимости
`npm i`
3. запустить приложение в режиме разработки
`npm run dev`

структура файл `.env` для фронтенда
```
VITE_BASE_URL=
VITE_SECRET_KEY=super-secret-key
```

### Проблемы проекта
- непонятно, достаточно ли настроек для обхода ограничений CORS : хотя удается реализовать прохождение запросов, но делаю это методом тыка, поэтому не понимаю насколько настройки необходимы и достаточны
- есть ворнинги связанные со старой необновляемой библиотекой `"react-contexify": "^6.0.0"`, для использования кастомного контекстного меню (возможно переделаю на bootstrap) переделал на `rc-menu` оказалось тоже самое, есть вориннг связанный с устаревшим методом
- сделал docker-compose.yml , который включает и приложение джанго серавера, но поке не работает
- после неправильного логина не происходит подтягивания ( loginUser or currentUser) и хук  useGetFilesQuery(currentUser.user_folder) отрабатывает с ошибкой (решено , просто опечатался  в [Login.tsx](frontend%2Fsrc%2Fcomponents%2FLogin.tsx) )
- [FileContextMenu.tsx](frontend%2Fsrc%2Fcomponents%2FFileContextMenu.tsx) при нескольких подряд действий для удаления зависает и не дает удалять следующие
- при обновлении паролей [UpdateUser.tsx](frontend%2Fsrc%2Fcomponents%2FUpdateUser.tsx) новый пароль не соответствует введенному
- есть ишью о том, что какой-то элемент формы не имеет id, пока этот элемент не нашел [AdminPanel.tsx](frontend%2Fsrc%2Fcomponents%2FAdminPanel.tsx)?? вроде убрал

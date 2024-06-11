FROM python:3.10

RUN apt update && apt install -y curl

WORKDIR /backend

COPY requirements.txt /backend/
RUN pip install --no-cache-dir -r requirements.txt

COPY ../.env /backend/.env
COPY . /backend/

EXPOSE 8000

RUN chmod +x ./start.sh


#RUN python manage.py migrate
# Опционально, если у вас есть папка с тестами и вы хотите запускать тесты
RUN python manage.py test

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
#ENTRYPOINT ["./start.sh"]

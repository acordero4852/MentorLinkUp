FROM python:3.8-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# copy requirements.txt from root directory. one level above
COPY /requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]

HEALTHCHECK --interval=30s --timeout=10s --retries=3 CMD curl --fail http://localhost:8000/ || exit 1
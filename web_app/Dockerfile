# Use the official Python image as a parent image
FROM python:3

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY ./requirements.txt /app/requirements.txt

# Install any needed dependencies specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

#COPY . /app

# Make port 5000 available to the world outside this container
EXPOSE 6000

# Define environment variable
ENV FLASK_APP=app.py

# Run app.py when the container launches # this is the command you use to run your projectt
#CMD ["python", "app.py", "--port", "6000"] 
CMD ["gunicorn", "-b", "0.0.0.0:6000", "app:app"]
from flask import Flask
from flask_sqlalchemy import SQLAlchemy 

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///StudentsDB.db'
app.config['SECRET_KEY'] = 'SecretKey862109!)'

db = SQLAlchemy(app)

app.app_context().push()

from application import routes
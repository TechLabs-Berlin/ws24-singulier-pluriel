from application import db
from datetime import datetime

class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, nullable = False, default=datetime.utcnow)
    name = db.Column(db.String(30), nullable=False)
    gender = db.Column(db.String(30), nullable=False)
    course = db.Column(db.String(30), nullable=False) 
    level = db.Column(db.String(30), nullable = False)
    points = db.Column(db.Integer, nullable = False)
    grade = db.Column(db.String(30), nullable = False)
    result = db.Column(db.String(30), nullable=False)

    def __str__(self):
        return self.id


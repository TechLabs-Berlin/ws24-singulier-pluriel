from application import app, db
from flask import render_template, flash, redirect, url_for, get_flashed_messages
from application.form import UserInputForm
from application.models import Student
import json
from statistics import mean

@app.route("/")
def index():
    entries = Student.query.order_by(Student.date.asc()).all()
    return render_template('index.html', title = 'index', entries = entries)

@app.route("/add", methods = ["GET", "POST"])
def add_expenses():
    form = UserInputForm()
    if form.validate_on_submit():
        entry = Student(name = form.name.data, gender = form.gender.data, course = form.course.data, level = form.level.data, points = form.points.data, grade = form.grade.data, result = form.result.data)
        db.session.add(entry)
        db.session.commit()
        flash("Succesful entry", 'success')
        return redirect(url_for('index'))
    return render_template('add.html', title = 'add', form = form)

@app.route("/delete/<int:entry_id>")
def delete(entry_id):
    entry = Student.query.get_or_404(int(entry_id))
    db.session.delete(entry)
    db.session.commit()
    flash("Deletion was succesful", 'success')
    return redirect (url_for("index")) 

@app.route("/dashboard")
def dashboard():
    
    query1 = db.session.query(db.func.count(Student.course),Student.course).group_by(Student.course).order_by(Student.course).all()

    query2 = db.session.query(db.func.count(Student.level), Student.level).group_by(Student.level).order_by(Student.level).all()

    query3 = db.session.query(db.func.count(Student.grade), Student.grade).group_by(Student.grade).order_by(Student.grade).all()

    query4 = db.session.query(db.func.count(Student.result),Student.result).group_by(Student.result).order_by(Student.result).all()


    query1_values = []
    for items, _ in query1:
        query1_values.append(items)

    query2_values = []
    for items, _ in query2:
        query2_values.append(items)

    query3_values = []
    for items, _ in query3:
        query3_values.append(items)
    
    query4_values = []
    for items, _ in query4:
        query4_values.append(items)


    return render_template("dashboard.html", query1 = json.dumps(query1_values), query2 = json.dumps(query2_values), query3 = json.dumps(query3_values), query4 = json.dumps(query4_values))

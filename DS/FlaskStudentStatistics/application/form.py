from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, IntegerField, SubmitField
from wtforms.validators import DataRequired

class UserInputForm(FlaskForm):
    name = StringField('Name', validators = [DataRequired()])
    gender = SelectField('Gender', validators = [DataRequired()], choices=[('Male', 'Male'), ('Female', 'Female')])
    course = SelectField('Course', validators = [DataRequired()], choices=[('Czech', 'Czech'), ('Dutch', 'Dutch'), ('English', 'English'), ('French', 'French'), ('German', 'German'), ('Italian', 'Italian'), ('Polish', 'Polish'), ('Portuguese', 'Portuguese'), ('Spanish', 'Spanish')])
    level = SelectField('Level', validators = [DataRequired()], choices=[('A1', 'A1'), ('A2', 'A2'), ('B1', 'B1'), ('B2', 'B2'), ('C1', 'C1'), ('C2', 'C2')])
    points = IntegerField('Points', validators = [DataRequired()])
    grade = SelectField('Grade', validators = [DataRequired()], choices=[('A', 'A'), ('B', 'B'), ('C', 'C'), ('D', 'D'), ('E', 'E'), ('F', 'F')])
    result = SelectField('Result', validators = [DataRequired()], choices=[('Pass', 'Pass'), ('Fail', 'Fail')])
    submit = SubmitField("Generate Report")


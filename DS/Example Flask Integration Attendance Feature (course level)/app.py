from flask import Flask, render_template

import pandas as pd



app = Flask(__name__)



@app.route('/')

def index():

    data = {'Student': ['Student 1', 'Student 2', 'Student 3', 'Student 4', 'Student 5', 'Student 6', 'Student 7', 'Student 8', 'Student 9', 'Student 10', 'Student 11', 'Student 12', 'Student 13', 'Student 14', 'Student 15', 'Student 16', 'Student 17', 'Student 18', 'Student 19', 'Student 20', 'Student 21', 'Student 22', 'Student 23', 'Student 24', 'Student 25', 'Student 26', 'Student 27', 'Student 28', 'Student 29', 'Student 30'], 'Attendance': [20, 28, 25, 27, 22, 23, 26, 20, 25, 28, 30, 23, 26, 28, 22, 27, 24, 29, 26, 25, 24, 20, 22, 29, 23, 27, 26, 24, 25, 28], }

    df = pd.DataFrame(data)

    average_attendance = df['Attendance'].mean()



    return render_template('index.html', data=df.to_dict(orient='records'), average=average_attendance)



if __name__ == '__main__':

    app.run()

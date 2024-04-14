import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

data = {'Student': ['Student 1', 'Student 2', 'Student 3', 'Student 4', 'Student 5', 'Student 6', 'Student 7', 'Student 8', 'Student 9', 'Student 10', 'Student 11', 'Student 12', 'Student 13', 'Student 14', 'Student 15', 'Student 16', 'Student 17', 'Student 18', 'Student 19', 'Student 20', 'Student 21', 'Student 22', 'Student 23', 'Student 24', 'Student 25', 'Student 26', 'Student 27', 'Student 28', 'Student 29', 'Student 30'],
        'Attendance': [20, 28, 25, 27, 22, 23, 26, 20, 25, 28, 30, 23, 26, 28, 22, 27, 24, 29, 26, 25, 24, 20, 22, 29, 23, 27, 26, 24, 25, 28],
       }
df = pd.DataFrame(data)

average_attendance = df['Attendance'].mean()
average_attendance

plt.figure(figsize=(10, 6))
plt.bar(df['Student'], df['Attendance'], color='#D6E2E9')
plt.axhline(y=average_attendance, color='r', linestyle='--', label='Average Attendance')
plt.xlabel('Student')
plt.ylabel('Attendance')
plt.title('Attendance Distribution for Italian A1.2')
plt.legend()
plt.xticks(rotation=90)
plt.savefig('attendance_chart.png', bbox_inches='tight')  # Add bbox_inches='tight' to adjust padding
plt.show()

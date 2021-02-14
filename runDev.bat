cd /d %~dp0
CALL venv\Scripts\activate
start chrome http://127.0.0.1:5000/
python __init__.py
pause
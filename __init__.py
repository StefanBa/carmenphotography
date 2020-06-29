from flask import Flask, render_template, url_for, request, redirect, request
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail, Message
from datetime import datetime
import logging
import os

app = Flask(__name__)
# four forwardslashes would be absolute path, three are relative
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///c_base.db'
db = SQLAlchemy(app)

mail_settings = {
    "MAIL_SERVER": 'smtp.gmail.com',
    "MAIL_PORT": 465,
    "MAIL_USE_TLS": False,
    "MAIL_USE_SSL": True,
    "MAIL_USERNAME": 'carmenphotography.donotreply@gmail.com',
    "MAIL_PASSWORD": 'carmenphotography67239'
}

category =	{
  "wedding": "Hochzeitsanlass",
  "family": "Freunde- / Paare- / Familienshooting",
  "business": "Firmenanlass",
  "other": "generelles Shooting"
}

app.config.update(mail_settings)
mail = Mail(app)

class Dataset(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    surname = db.Column(db.String(200), nullable=False)
    lastname = db.Column(db.String(200), nullable=False)
    email = db.Column(db.String(200), nullable=False)
    querytype = db.Column(db.String(200), nullable=False)
    details = db.Column(db.String(200), nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return '<Dataset %r>' % self.id

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/gallery/')
def gallery():
    return render_template('gallery.html')

@app.route('/about/')
def about():
    return render_template('about.html')

@app.route('/contact/', methods=['POST', 'GET'])
def contact():
    if request.method == 'POST':
        if request.form['url'] != "":
            return render_template('contact.html') #it's a bot!
        data_surname = request.form['surname']
        data_lastname = request.form['lastname']
        data_email = request.form['email']
        data_querytype = request.form['querytype']
        data_querytype = category[data_querytype]
        data_details = request.form['details']
        new_dataset = Dataset(surname=data_surname, lastname=data_lastname, email=data_email, querytype=data_querytype, details=data_details)
        msg = Message(subject=data_surname + ": " + data_querytype + "   - carmenphotography.ch",
        sender=app.config.get("MAIL_USERNAME"),
        recipients=["<baettig.carmen@gmail.com"], # replace with your email for testing
        html="\
            <h3>Anfrage: "+ data_querytype +"</h3>\
            <p>von: "+ data_surname + " " + data_lastname + "</p>\
            <p>"+ data_details +"</p>\
            <p>"+ data_email +"</p>\
                ")
        msg.add_recipient("stefanbaumann.b@gmail.com")
        try:
            db.session.add(new_dataset)
            db.session.commit()
            mail.send(msg)
            return redirect('/thanks/')
        except:
            return 'There was an issue to add your request. Please try again.'
    else:
        return render_template('contact.html')

@app.route('/thanks/')
def contact2():
    return render_template('thanks.html')

@app.route('/update/', methods=['POST'])
def update():
    app.logger.warning(request)
    os.system("cd /var/www/webApp/webApp/ & git pull cp master")
    return ("fun2", 200, None)


# @app.route('/', methods=['POST', 'GET'])
# def index():
#     if request.method == 'POST':
#         task_content = request.form['content']
#         new_task = ToDo(content=task_content)
#         try:
#             db.session.add(new_task)
#             db.session.commit()
#             return redirect('/')
#         except:
#             return 'There was an issue adding your task'
#     else:
#         tasks = ToDo.query.order_by(ToDo.date_created).all()
#         return render_template('index.html', tasks=tasks)


# @app.route('/delete/<int:id>')
# def delete(id):
#     task_to_delete = ToDo.query.get_or_404(id)
#     try:
#         db.session.delete(task_to_delete)
#         db.session.commit()
#         return redirect('/')
#     except:
#         return 'There was a problem delting your task'


# @app.route('/update/<int:id>', methods=['POST', 'GET'])
# def update(id):
#     task = ToDo.query.get_or_404(id)
#     if request.method == 'POST':
#         task.content = request.form['content']

#         try:
#             db.session.commit()
#             return redirect('/')
#         except:
#             return 'There was an issue updating your task'
#     else:
#         return render_template('update.html', task=task)


if __name__ == "__main__":
    app.run(debug=True)

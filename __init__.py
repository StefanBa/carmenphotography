import sys
import subprocess
sys.path.insert(0, "/var/www/webApp/webApp") #else my mailconfig module doesn't get found for some reason
from flask import Flask, render_template, url_for, request, redirect, request, json
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail, Message
# from flask_login import LoginManager
from datetime import datetime
import logging
import subprocess
import os
import traceback
import mailconfig

app = Flask(__name__)
# four forwardslashes would be absolute path, three are relative.
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///c_base.db'
db = SQLAlchemy(app)

# login_manager = LoginManager()
# login_manager.init_app(app)


category =	{
    "wedding": "Hochzeitsanlass",
    "family": "Freunde- / Paare- / Familienshooting",
    "business": "Firmenanlass",
    "other": "generelles Shooting"
}

mail_settings = mailconfig.mail_settings
mail_recipients = mailconfig.mail_recipients
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

# caching trick from
# https://ana-balica.github.io/2014/02/01/autoversioning-static-assets-in-flask/
@app.template_filter('autoversion')
def autoversion_filter(filename):
    # determining fullpath might be project specific
    fullpath = os.path.join(app.instance_path[:-9], filename[1:])
    try:
        timestamp = str(os.path.getmtime(fullpath))
    except OSError:
        fullpath = os.path.join(app.instance_path[:-9]+"/webApp", filename[1:])
        try:
            timestamp = str(os.path.getmtime(fullpath))
        except OSError:
            app.logger.warning(traceback.format_exc())
            return filename
    newfilename = "{0}?v={1}".format(filename, timestamp)
    return newfilename

@app.route('/')
def index():
    app.logger.info("home")
    app.logger.info(sys.version)
    return render_template('index.html')

@app.route('/gallery/')
def gallery():
    pics = list()
    galleryPath = os.path.join(app.static_folder, 'gallery')
    for file in os.listdir(galleryPath):
        if file.endswith(".jpg"):
            pics.append(file)
    # print(picsPath, file=sys.stderr)
    return render_template('gallery.html', pics=json.dumps(pics))

@app.route('/about/')
def about():
    return render_template('about.html')

@app.route('/contact/', methods=['POST', 'GET'])
def contact():
    if request.method == 'POST':
        if request.form['url1'] != "":
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
        recipients=[mail_recipients[0]], # replace with your email for testing
        html="\
            <h3>Anfrage: "+ data_querytype +"</h3>\
            <p>von: "+ data_surname + " " + data_lastname + "</p>\
            <p>"+ data_details +"</p>\
            <p>"+ data_email +"</p>\
                ")
        msg.add_recipient(mail_recipients[1])
        try:
            db.session.add(new_dataset)
            db.session.commit()
            mail.send(msg)
            return redirect('/thanks/')
        except:
            app.logger.warning(traceback.format_exc())
            return 'There was an issue to add your request. Please try again.'
    else:
        return render_template('contact.html')

@app.route('/thanks/')
def contact2():
    return render_template('thanks.html')

@app.route('/login/', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        if request.form['url1'] != "":
            return render_template('contact.html') #it's a bot!
        email = request.form['email']
        password = request.form['password']
        # if email == mailconfig.mail_settings['MAIL_USERNAME'] and password == mailconfig.mail_settings['MAIL_PASSWORD']:
        if email == "e" and password == "e":
            app.logger.info("logged in")
            return render_template('index.html')
    return render_template('login.html')

@app.route('/update/', methods=['POST'])
def update():
    app.logger.info(request)
    # os.system("sudo /home/ubuntu/Desktop/gitpull.sh")
    subprocess.Popen(['sudo','/home/ubuntu/Desktop/gitpull.sh'])
    return ("webhook", 200, None)

@app.route('/beer/')
def bier():
    return render_template('beer.html')

if __name__ == "__main__":
    app.run(debug=True)

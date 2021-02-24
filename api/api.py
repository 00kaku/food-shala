from flask import Flask,request,json
from flask_mysqldb import MySQL 
from flask_cors import CORS 
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_jwt_extended import create_access_token

app=Flask(__name__,static_folder='../build', static_url_path='/')

app.config['MYSQL_HOST']=''
app.config['MYSQL_USER']=''
app.config['MYSQL_PASSWORD']=''
app.config['MYSQL_DB']=''
app.config['MYSQL_CURSORCLASS']='DictCursor'
app.config['JWT_SECRET_KEY']='areallysecretkey'

mysql = MySQL(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
CORS(app)

@app.route('/')
def index():
    return app.send_static_file('index.html')
########## CUSTOMERS   ############################
##----------AUTHENTICATION-----------------------##


@app.route('/customers/register',methods=['POST'])
def customer_register():
	cur =mysql.connection.cursor()
	first_name = request.get_json(force='true')['first_name']
	last_name = request.get_json()['last_name']
	email =request.get_json()['email']
	username = request.get_json()['username']
	password = bcrypt.generate_password_hash(request.get_json()['password']).decode('utf-8')
	isVeg  = request.get_json()['isVeg']

	cur.execute("SELECT COUNT(username) FROM  Customers WHERE username='"+str(username)+"'")
	result=cur.fetchone()['COUNT(username)']

	if(result==0):
		cur.execute("INSERT INTO Customers (first_name,last_name,username,email,password,isVeg) VALUES ('"+
		str(first_name) +"','"+
		str(last_name) +"','"+
		str(username) +"','"+
		str(email) +"','"+
		str(password) +"','"+
		str(isVeg) +"')"
		)
	
		mysql.connection.commit()

		result ={
			"first_name":first_name,
			"last_name":last_name,
			"username":username,
			"email":email,
			"password":password,
			"isVeg":isVeg
							}

		return {"result":result}
	else:
		return{"result":"Username Taken"}

@app.route('/customers/login',methods=['POST'])
def customer_login():
	cur =mysql.connection.cursor()
	
	username = request.get_json(force='true')['username']
	password = request.get_json()['password']
	result=""

	cur.execute("Select * from Customers where username = '"+str(username)+"'")

	rv = cur.fetchone()

	if bcrypt.check_password_hash(rv['password'],password):
		access_token = create_access_token(identity={'first_name':rv['first_name'],'last_name':rv['last_name'],'username':rv['username'],'isVeg':rv['isVeg']})
		result = {'token':access_token}
	else:
		result = {'ERROR':"Data Invalid"}

	return result


##----------ORDERS-----------------------##
@app.route('/customers/order',methods=['POST'])
def customers_order():
	cur =mysql.connection.cursor()
	
	customerId = request.get_json(force='true')['customerId']
	restaurantId = request.get_json()['restaurantId']
	menuItems=request.get_json()['menuItems']
	price = request.get_json()['price']

	cur.execute("INSERT INTO Orders (customerId,restaurantId,price,menuItems) VALUES ('"+
		str(customerId) +"','"+
		str(restaurantId) +"','"+
		str(price) +"','"+
		str(menuItems) +"')"
		)
	
	mysql.connection.commit()

	result ={
			"customerId":customerId,
			"restaurantId":restaurantId,
			"price":price,
			"menuItems":menuItems,
		
	}

	return {'result':result} 


@app.route('/customers/orderList',methods=['POST'])
def customer_orderList():
	cur =mysql.connection.cursor()
	
	customerId = request.get_json(force='true')['customerId']

	cur.execute("SELECT orderId,menuItems,price,Date,res.Name FROM Orders"+ 
		" LEFT JOIN Restaurants res ON res.username=restaurantId WHERE customerId='"+customerId+"' ORDER BY Date DESC")
	
	result = cur.fetchall()
	mysql.connection.commit()

	return {"result":result}

########## RESTAURNATS  ###########################
##----------AUTHENTICATION-----------------------##

@app.route('/restaurants/register',methods=['POST'])
def restaurants_register():
	cur =mysql.connection.cursor()
	name = request.get_json(force='true')['name']
	email =request.get_json()['email']
	username = request.get_json()['username']
	cusine = request.get_json()['cusine']
	password = bcrypt.generate_password_hash(request.get_json()['password']).decode('utf-8')
	
	cur.execute("SELECT COUNT(username) FROM  Restaurants WHERE username='"+str(username)+"'")
	result=cur.fetchone()['COUNT(username)']

	if(result==0):
		cur.execute("INSERT INTO Restaurants (Name,username,email,cusine,password) VALUES ('"+
		str(name) +"','"+
		str(username) +"','"+
		str(email) +"','"+
		str(cusine) +"','"+
		str(password) +"')"
		)
	
		mysql.connection.commit()

		result ={
			"name":name,
			"username":username,
			"email":email,
			"password":password,
			"cusine":cusine
			}

		return {"result":result}
	else:
		return {"result":"username taken"}

@app.route('/restaurants/login',methods=['POST'])
def restaurants_login():
	cur =mysql.connection.cursor()
	
	username = request.get_json(force='true')['username']
	password = request.get_json()['password']
	result=""

	cur.execute("Select * from Restaurants where username = '"+str(username)+"'")

	rv = cur.fetchone()

	if bcrypt.check_password_hash(rv['password'],password):
		access_token = create_access_token(identity={'name':rv['Name'],'username':rv['username']})
		result = {'token':access_token}
	else:
		result = {'ERROR':"Data Invalid"}

	return result

##----------MENU ITEM-----------------------##
@app.route('/restaurants/add',methods=['POST'])
def restaurants_add():
	cur =mysql.connection.cursor()
	
	name = request.get_json(force='true')['name']
	isVeg = request.get_json()['isVeg']
	description =request.get_json()['description']
	restaurantId = request.get_json()['username']
	price = request.get_json()['price']

	cur.execute("INSERT INTO MenuItem (name,isVeg,description,price,restaurantId) VALUES ('"+
		str(name) +"','"+
		str(isVeg) +"','"+
		str(description) +"','"+
		str(price) +"','"+
		str(restaurantId) +"')"
		)
	
	mysql.connection.commit()

	result ={
			"name":name,
			"isVeg":isVeg,
			"description":description,
			"restaurantId":restaurantId,
			"price":price
	}

	return {"result":result}

##----------ORDERS-----------------------##
@app.route('/restaurants/orderList',methods=['POST'])
def restaurants_orderList():
	cur =mysql.connection.cursor()
	
	restaurantId = request.get_json(force='true')['restaurantId']

	cur.execute("SELECT orderId,menuItems,price,Date,res.Name FROM Orders"+ 
		" LEFT JOIN Restaurants res ON res.username=restaurantId WHERE restaurantId='"+restaurantId+"' ORDER BY Date DESC")
	
	result = cur.fetchall()
	mysql.connection.commit()

	return {"result":result}


########## MENU PAGE  ###########################
@app.route('/restaurants/list',methods=['POST'])
def restaurants_list():
	cur =mysql.connection.cursor()
	
	cur.execute("SELECT Name,username,cusine FROM Restaurants")
	
	result = cur.fetchall()
	mysql.connection.commit()

	return {"result":result}


@app.route('/restaurants/menu',methods=['POST'])
def restaurants_menu():
	cur =mysql.connection.cursor()
	
	restaurantId=request.get_json(force='true')['restaurantId']

	cur.execute("SELECT Name,description,isVeg,price FROM MenuItem where restaurantId ='"+str(restaurantId)+"' ")
	
	result = cur.fetchall()
	mysql.connection.commit()
	
	return {'result':result}


if __name__ == '__main__':
	app.run(debug = True)

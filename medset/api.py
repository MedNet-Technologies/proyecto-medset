import os
import psycopg2
from psycopg2 import connect, extras
from flask import Flask, render_template, jsonify, Response, send_file, request
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def get_connection():
    conn = psycopg2.connect(host='localhost',
                            database='mednet',
                            user='postgres',
                            password='postgres')
    return conn

@app.route("/")
def homepage():
    return "<h1>Hello world</h1>"

@app.get('/medics')
def get_medics():
    conn = get_connection()
    cur = conn.cursor(cursor_factory=extras.RealDictCursor)

    cur.execute("SELECT * FROM medics")
    result = cur.fetchall()

    cur.close()
    conn.close()

    

    return jsonify({'medics':result})

@app.get('/medics/filter')
def get_medics_by_specialization():
    specialization = request.args["specialization"]
    geographic_location = request.args["geographic_location"]
    conn = get_connection()
    cur = conn.cursor(cursor_factory=extras.RealDictCursor)
    
    if(specialization == "" and geographic_location == ""):
        cur.execute("SELECT * FROM medics")
    elif (specialization != "" and geographic_location == ""):
        cur.execute("SELECT * FROM medics WHERE specialization = %s", (specialization,))
    elif (specialization == "" and geographic_location != ""):
        cur.execute("SELECT * FROM medics WHERE geographic_location = %s", (geographic_location,))
    else:
        cur.execute("SELECT * FROM medics WHERE specialization = %s AND geographic_location = %s", (specialization, geographic_location))
    result = cur.fetchall()

    cur.close()
    conn.close()

    return jsonify(result)

@app.post("/medics")
def post_medic():
    first_name = request.args["first_name"]
    last_name= request.args["last_name"]
    specialization= request.args["specialization"]
    credentials = request.args["credentials"]
    geographic_location = request.args["geographic_location"]
    

    conn = get_connection()
    cur = conn.cursor(cursor_factory=extras.RealDictCursor)
    cur.execute("INSERT INTO medics (first_name, last_name, specialization, credentials, geographic_location) VALUES (%s,%s,%s,%s,%s) RETURNING *",
                      (first_name,last_name,specialization,credentials,geographic_location))
    
    result = cur.fetchone()
    conn.commit()

    cur.close()
    conn.close()

    return jsonify(result)

@app.put("/medics")
def update_medic():
    medic_id = request.args["medic_id"]
    geographic_location = request.args["geographic_location"]

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("UPDATE medics SET geographic_location = %s WHERE medic_id = %s RETURNING *", (geographic_location, medic_id))
    res = cur.fetchone()

    conn.commit()

    cur.close()
    conn.close()
    
    if res is None:
        return jsonify({'message': 'Medic not found'}), 404
    return jsonify(res)

@app.delete("/medics")
def delete_medic():
    medic_id = request.args["medic_id"]

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("DELETE FROM medics WHERE medic_id = %s RETURNING *", (medic_id,))
    res = cur.fetchone()

    conn.commit()

    cur.close()
    conn.close()
    
    if res is None:
        return jsonify({'message': 'Medic not found'}), 404
    return jsonify(res)
        
@app.get('/appointments')
def get_appointments():
    conn = get_connection()
    cur = conn.cursor(cursor_factory=extras.RealDictCursor)

    cur.execute("SELECT * FROM appointments")
    result = cur.fetchall()

    cur.close()
    conn.close()

    return jsonify(result)



if __name__ == "__main__":
    app.run(host='0.0.0.0',port=8080)
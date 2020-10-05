import 'package:flutter/material.dart';
import './registration.dart';
import './drawer.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'LogIn Ipop',
      home: LogInScreen(),
      debugShowCheckedModeBanner: false,
    );
  }
}

class LogInScreen extends StatelessWidget {
  final _scaffoldKey = GlobalKey<ScaffoldState>();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: _scaffoldKey,
      body: Center(
        child:SingleChildScrollView(
        child: Container(
          margin: EdgeInsets.all(30.0),
          height: 550.0,
          width: 600,
          decoration: BoxDecoration(
              shape: BoxShape.rectangle,
              color: Colors.white,
            boxShadow: [
              BoxShadow(color: Theme.of(context).primaryColor, spreadRadius: 3),
            ],
              borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(25.0),
                  bottomRight: Radius.circular(25.0),)),


          child: Padding(
            padding: const EdgeInsets.all(20.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[

                SizedBox(
                  height: 155.0,
                  child: Image.asset(
                    "images/logo.png",
                    fit: BoxFit.contain,
                  ),
                ),

                SizedBox(
                  height: 80.0,
                  width: 400,
                  child: TextField(
                    textAlign: TextAlign.center,
                    decoration: InputDecoration(
                          enabledBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.all(Radius.circular(25.0)),
                            borderSide: BorderSide(color: Theme.of(context).primaryColor, width: 3.0),
                          ),
                          focusedBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.all(Radius.circular(25.0)),
                            borderSide: BorderSide(color: Colors.grey, width: 3.0),
                          ),
                        hintText: 'Username'
                    ),
                  ),
                ),

                SizedBox(
                  height: 80.0,
                  width: 400,
                  child: TextField(
                    textAlign: TextAlign.center,
                    obscureText: true,
                    decoration: InputDecoration(
                      enabledBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.all(Radius.circular(25.0)),
                        borderSide: BorderSide(color: Theme.of(context).primaryColor, width: 3.0),
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.all(Radius.circular(25.0)),
                        borderSide: BorderSide(color: Colors.grey, width: 3.0),
                      ),
                        hintText: 'Password',
                    ),
                  ),
                ),

                Container(
                  height: 60.0,
                  width: 400.0,
                  margin: EdgeInsetsDirectional.only(bottom: 10.0),
                  child: FlatButton(
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(25.0),
                        side: BorderSide(color: Theme.of(context).primaryColor)
                    ),
                    color: Theme.of(context).primaryColor,

                    onPressed: () {
                      Navigator.push(context, MaterialPageRoute(builder: (context) => DrawerScreen()));
                    },
                    child: Text("LogIn"),
                    textColor: Colors.white,
                  ),
                ),

                Container(
              height: 60.0,
              width: 400.0,
              margin: EdgeInsetsDirectional.only(bottom: 10.0),
              child: FlatButton(
                shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(25.0),
                    side: BorderSide(color: Theme.of(context).primaryColor)
                ),
                color: Theme.of(context).primaryColor,

                onPressed: () {
                  Navigator.push(context, MaterialPageRoute(builder: (context) => RegistrationScreen()));
                },
                child: Text("Register"),
                textColor: Colors.white,
              ),
            ),

              ],
            ),
          ),
        ),
      ),
      ),
    );
  }
}

using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Firebase;
using Firebase.Database;
//using Firebase.Unity.Editor;

public class LeftWristBehaviourScript : MonoBehaviour
{
    public DatabaseReference databaseReference;
    public Transform targetTransform;

    //public double Myx = 0.7377692, Myy = 2.435655, Myz = 0.06171536;

    public float x, y, z;

    private Transform leftWristTransform;

    // Start is called before the first frame update
    void Start()
    {
        // Get the transform component of the game object
        leftWristTransform = GetComponent<Transform>();

        databaseReference = FirebaseDatabase.DefaultInstance.RootReference;

        // Set up Firebase Realtime Database
        //Firebase.FirebaseApp.DefaultInstance.Options.DatabaseUrl("https://mocapv1-15bb7-default-rtdb.firebaseio.com");
        //databaseReference = FirebaseDatabase.DefaultInstance.GetReference("/poseLandMarks/poseLandMarks/left_wrist/-NW1qisJRxVRCB0KwJlS");

        // Set up listener for data changes
        databaseReference.ValueChanged += HandleDataChange;

        

    }

    private void HandleDataChange(object sender, ValueChangedEventArgs args)
    {
        if (args.DatabaseError != null)
        {
            Debug.LogError(args.DatabaseError.Message);
            return;
        }

        // Retrieve and update data from Firebase
        if (args.Snapshot != null && args.Snapshot.Value != null)
        {
            // Example: Updating position
            x = float.Parse(args.Snapshot.Child("poseLandMarks").Child("poseLandMarks").Child("left_wrist").Child("-NW1qisJRxVRCB0KwJlS").Child("x").Value.ToString());
            y = float.Parse(args.Snapshot.Child("poseLandMarks").Child("poseLandMarks").Child("left_wrist").Child("-NW1qisJRxVRCB0KwJlS").Child("y").Value.ToString());
            z = float.Parse(args.Snapshot.Child("poseLandMarks").Child("poseLandMarks").Child("left_wrist").Child("-NW1qisJRxVRCB0KwJlS").Child("z").Value.ToString());
            //targetTransform.position = new Vector3(x, y, z);

            // Example: Updating rotation
            // ...

            // Example: Updating scale
            // ...

            Debug.Log(x);
            leftWristTransform.position = new Vector3(x, y, z);
        }
    }

    // Update is called once per frame
    void Update()
    {

        //Myz = Myz - 0.1;

        //gameObject.transform.Position(new Vector3((float)Myx, (float)Myy, (float)Myz));
        //targetTransform.position = new Vector3((float)Myx, (float)Myy, (float)Myz);
        //Debug.Log(x);
        // For example, you can change the position, rotation, or scale
        //leftWristTransform.position = new Vector3(x, y, z);
        
    }
}

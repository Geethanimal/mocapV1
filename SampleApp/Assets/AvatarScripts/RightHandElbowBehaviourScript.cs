using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Firebase;
using Firebase.Database;

public class RightHandElbowBehaviourScript : MonoBehaviour
{
    public DatabaseReference databaseReference;

    public float x, y, z;

    private Transform rightElbowTransform;

    // Start is called before the first frame update
    void Start()
    {
        // Get the transform component of the game object
        rightElbowTransform = GetComponent<Transform>();

        // Set up Firebase Realtime Database
        databaseReference = FirebaseDatabase.DefaultInstance.RootReference;

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
            x = float.Parse(args.Snapshot.Child("user123").Child("poseLandMarks").Child("right_elbow").Child("x").Value.ToString());
            y = float.Parse(args.Snapshot.Child("user123").Child("poseLandMarks").Child("right_elbow").Child("y").Value.ToString());
            z = float.Parse(args.Snapshot.Child("user123").Child("poseLandMarks").Child("right_elbow").Child("z").Value.ToString());
            //targetTransform.position = new Vector3(x, y, z);

            // Example: Updating rotation
            // ...

            // Example: Updating scale
            // ...

            //Debug.Log(x);
            rightElbowTransform.position = new Vector3(x, y, z);
        }
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}

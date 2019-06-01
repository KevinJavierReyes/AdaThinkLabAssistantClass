using System.Collections;
using System.Collections.Generic;
using UnityEngine;


public class rotateY : MonoBehaviour {


    float x = 0f;
    float y = 3f;
    float z = 0f;


    // Use this for initialization
    void Start () {
		
	}
	
	// Update is called once per frame
	void Update () {
        transform.Rotate(x, y, z);
    }

  

}

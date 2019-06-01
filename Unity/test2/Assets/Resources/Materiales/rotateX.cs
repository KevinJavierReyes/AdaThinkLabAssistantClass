using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class rotateX : MonoBehaviour {


    float x = 3f;
    float y = 0f;
    float z = 0f;

    // Use this for initialization
    void Start () {
		
	}
	
	// Update is called once per frame
	void Update () {
        transform.Rotate(x, y, z);
    }
}

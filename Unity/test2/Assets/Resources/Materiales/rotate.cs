using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class rotate : MonoBehaviour {

    float x = 0f;
    float y = 0f;
    float z = 3f;

    // Use this for initialization
    void Start () {
		
	}

    // Update is called once per frame
    void Update() {
        transform.Rotate(x,y,z);
	}
}

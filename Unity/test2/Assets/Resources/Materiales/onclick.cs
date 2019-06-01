using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class onclick : MonoBehaviour {
    

	// Use this for initialization
	void Start () {
        
    }
	
	// Update is called once per frame
	void Update () {


        if (Input.GetMouseButtonDown(0))
        {
            Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);
            RaycastHit hit;
            Debug.Log("vdklnnvdvskjgskjshl");
            if (Physics.Raycast(ray, out hit))
            {
                
                Debug.Log("246767645425364758657463524536474");
                //Select Stage
                if (hit.transform.name == "Cube")
                {
                    Application.OpenURL("https://www.google.com");
                }
            }
        }

    }
}

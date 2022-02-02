import React, { useEffect, useState } from 'react'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormSwitch,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

import { firebaseDatabase } from 'src/initFirebase';  

const Dashboard = () => {
  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  const [listDataMenu, setlistDataMenu] = useState([])

  function getListMenu() {
    firebaseDatabase.ref("menu").on("value", (snapshot) => {
      if (snapshot.exists) {
        if (snapshot.val() !== null) {
          var tempList = [];
          var tempData = Object.values(snapshot.val());
          tempList = tempData;
          console.log("List Data Menu =>", tempList);
          setlistDataMenu(tempList);
        }
      } else {
        setlistDataMenu([]);
      }
    });
  }
  function updateMenuList(uid,body) {
    console.log("body", body);
    firebaseDatabase
      .ref(`menu/${uid}`)
      .update(body)
      .then((status) => {
        console.log(status);
        getListMenu()
      });
  }
  useEffect(()=>{
    getListMenu()
  },[])
  return (
    <>
      <CCard className='mb-4'>
        <CCardHeader>
          List Menu (Parent)
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol>
              <CTable striped>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Menu</CTableHeaderCell>
                    <CTableHeaderCell scope="col">isShowed</CTableHeaderCell>
                    <CTableHeaderCell scope="col">isAllowed</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {listDataMenu.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell>
                        <div>{index + 1}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.id}</div>
                        {(Array.isArray(item.childs)) &&<div>{item.childs.map((children,indexChildren)=>(
                          <div key={indexChildren}>
                            - {children.id}
                          </div>
                        ))}</div>}
                      </CTableDataCell>
                      <CTableDataCell>
                        <CFormSwitch size="lg" id="formSwitchCheckDefaultLg" checked={item.isShowed} onChange={(event)=>{
                          updateMenuList(item.id,{
                            isShowed: !item.isShowed
                          })
                        }}/>
                      </CTableDataCell>
                      <CTableDataCell>
                      <CFormSwitch size="lg" id="formSwitchCheckDefaultLg" checked={item.isAllowed} onChange={(event)=>{
                          updateMenuList(item.id,{
                            isAllowed: !item.isAllowed
                          })
                        }}/>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard

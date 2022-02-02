import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CAvatar, CCol, CImage, CNavGroup, CNavItem, CRow, CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'

import avanaLogo from './../assets/brand/agx4saym2dmetl3gai93.png'
import avatar from './../assets/images/avatars/7.jpg'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import { firebaseDatabase } from 'src/initFirebase'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const [navigation, setnavigation] = useState([])
  const getListMenu = () => {
    firebaseDatabase.ref("menu").on("value", (snapshot) => {
      if (snapshot.exists) {
        if (snapshot.val() !== null) {
          var tempList = [];
          var tempData = Object.values(snapshot.val());
          tempList = tempData;
          console.log("Nav Data Menu =>", tempList);
          let olahList = [];
          tempList.forEach((element, index) => {
            if (element.isShowed && element.isAllowed) {
              if (element.childs) {
                let tempChild = [];
                element.childs.forEach((children, indexChildren) => {
                  tempChild.push(
                    {
                      component: CNavItem,
                      name: children.id,
                      to: '/'+children.id,
                    },
                  )
                })
                olahList.push({
                  component: CNavGroup,
                  name: element.id,
                  to: "/" + element.id,
                  items: tempChild
                })
              } else
                olahList.push({
                  component: CNavItem,
                  name: element.id,
                  to: "/" + element.id
                })
            }
          })
          setnavigation(olahList)
        }
      } else {
        setnavigation([])
      }
    });
  }
  useEffect(() => {
    getListMenu()
  }, [])
  return (
    <CSidebar
      position="fixed"
      style={{ backgroundColor: "#1D1D1D" }}
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <CImage className='sidebar-brand-full' src='https://avana.id/wp-content/themes/avana-id/assets/images/logo.webp' alt='Avana' height={35} />
        <CImage className="sidebar-brand-narrow" src={avanaLogo} height={35} />
      </CSidebarBrand>
      <CSidebarNav>
        <div className='sidebar-brand-full'>
          <CRow>
            <CCol className='d-flex justify-content-center pt-5 pb-3'>
              <CAvatar className='sidebar-brand-full' src={avatar} alt='Avatar' size="xl" />
            </CCol>
          </CRow>
          <CRow>
            <CCol className='d-flex justify-content-center pb-5'>
              <strong>Djajusman Albugis</strong>
            </CCol>
          </CRow>
        </div>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)

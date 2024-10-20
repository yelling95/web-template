import React from 'react'
import {
  Button,
  Table,
  Select,
  Input,
  Modal,
  Datepicker,
  DurationDatepicker,
  Calendar,
  Checkbox,
} from 'react-xg-ui'
import {slice} from 'lodash-es'

import {useDispatch, useSelector, shallowEqual} from 'react-redux'
import {testActions} from '../../actions/test.action'

import './Main.scss'

function MainView(props) {
  const dispatch = useDispatch()

  const {header, testData} = useSelector((state) => {
    return state['test.action']
  }, shallowEqual)

  const [inputValue, setInputValue] = React.useState('')
  const [isState, setIsState] = React.useState('default')
  const [isShow, setIsShow] = React.useState(false)

  const [startDate, setStartDate] = React.useState(undefined)
  const [endDate, setEndDate] = React.useState(undefined)

  const [date, setDate] = React.useState(new Date())

  const getTableData = ({startIndex, endIndex, filterData}) => {
    return new Promise(function (resolve, reject) {
      console.log(filterData, startIndex)
      resolve({
        data: {
          result: true,
          data: {
            total: testData.length,
            testList: slice(testData, startIndex, endIndex),
          },
        },
      })
    })
  }

  const getTest = async () => {
    const response = await dispatch(testActions.getTest()).unwrap()
    console.log('response', response)
  }

  return (
    <div className="main_container">
      <p>large size / disabled</p>
      <div style={{display: 'flex', gap: '20px', marginBottom: '20px'}}>
        <Button onClick={() => setIsShow(true)} style={{width: '120px'}}>
          모달 열기
        </Button>
        <Button onClick={(id) => console.log(id)} style={{width: '120px'}} disabled />

        <Button type="secondary" onClick={(id) => getTest()} style={{width: '120px'}}>
          api 호출
        </Button>
        <Button type="line" onClick={(id) => console.log(id)} style={{width: '120px'}} />
      </div>

      <p>small size</p>
      <div style={{display: 'flex', gap: '20px', marginBottom: '20px'}}>
        <Button size="sm" onClick={(id) => console.log(id)} style={{width: '120px'}} />
        <Button
          size="sm"
          type="secondary"
          onClick={(id) => console.log(id)}
          style={{width: '120px'}}
        />
        <Button size="sm" type="line" onClick={(id) => console.log(id)} style={{width: '120px'}} />
      </div>

      <p>alert / user</p>
      <div style={{display: 'flex', gap: '20px', marginBottom: '20px'}}>
        <Button size="sm" type="alert" onClick={(id) => console.log(id)} style={{width: '120px'}} />
        <Button
          size="sm"
          type="alert"
          onClick={(id) => console.log(id)}
          style={{width: '120px'}}
          disabled
        />

        <Button size="sm" type="user" onClick={(id) => console.log(id)} style={{width: '120px'}} />
        <Button
          size="sm"
          type="user"
          onClick={(id) => console.log(id)}
          style={{width: '120px'}}
          disabled
        />
      </div>

      <p>tab</p>
      <div style={{display: 'flex', gap: '20px', marginBottom: '20px'}}>
        <Button size="sm" type="tab" onClick={(id) => console.log(id)} style={{width: '120px'}} />
        <Button
          size="sm"
          type="tab"
          onClick={(id) => console.log(id)}
          style={{width: '120px'}}
          disabled
        />
        <Button
          size="sm"
          type="tab"
          className="selected"
          onClick={(id) => console.log(id)}
          style={{width: '120px'}}
        />
      </div>
      <Table
        headers={header}
        data={testData}
        clickRow={(rowId) => console.log(rowId)}
        primaryKey={'id'}
        hasSearch={true}
        maxRow={10}
        // hasPagination={true}
        size={'lg'}
        // server side
        isServerSide={true}
        isServerSideTotalPage={10}
        serverSideFn={getTableData}
        isLoading={false}
        dataKey={'testList'}
      />
      <Input
        isState={isState}
        value={inputValue}
        onChange={({id, value}) => {
          setIsState('error')
          value.length > 3 ? setIsState('default') : setIsState('error')
          setInputValue(value)
        }}
        errorMessage={'에러메세지'}
        label={'라벨'}
        style={{marginTop: '20px', width: '200px'}}
      />
      <Select
        type="search"
        options={[
          {name: 'test1', value: 1},
          {name: 'test2', value: 2},
        ]}
        style={{width: '200px'}}
      />
      <Modal
        isShow={isShow}
        isShowDimm
        close={() => setIsShow(false)}
        title={'모달 제목'}
        style={{width: '500px'}}>
        <span>안녕하세요!!!</span>
      </Modal>

      <DurationDatepicker
        isDuration
        style={{width: '240px'}}
        onChange={(start, end) => {
          setStartDate(start)
          setEndDate(end)
        }}
        startDate={startDate}
        endDate={endDate}
      />
      <Datepicker
        isDuration
        style={{width: '240px'}}
        date={date}
        onChange={(day) => setDate(day)}
      />

      <div>
        <Calendar
          event={[
            {
              color: 'rgba(214, 249, 234, 1)',
              name: '에러1에러1에러1에러1에러1에러1에러1에러1',
              date: new Date(),
            },
            {
              color: 'rgba(255, 239, 239, 1)',
              name: '에러2',
              date: new Date(),
            },
            {
              color: 'rgba(255, 239, 239, 1)',
              name: '에러3',
              date: new Date(),
            },
            {
              color: 'rgba(214, 249, 234, 1)',
              name: '에럿1',
              date: new Date().setDate(25),
            },
            {
              color: 'rgba(255, 239, 239, 1)',
              name: '에럿2',
              date: new Date().setDate(25),
            },
            {
              color: 'rgba(214, 249, 234, 1)',
              name: '에럿3',
              date: new Date().setDate(25),
            },
            {
              color: 'rgba(255, 239, 239, 1)',
              name: '에럿4',
              date: new Date().setDate(25),
            },
            {
              color: 'rgba(255, 239, 239, 1)',
              name: '에럿5',
              date: new Date().setDate(25),
            },
            {
              color: 'rgba(255, 239, 239, 1)',
              name: '에럿1',
              date: new Date().setDate(28),
            },
            {
              color: 'rgba(255, 239, 239, 1)',
              name: '에럿2',
              date: new Date().setDate(28),
            },
            {
              color: 'rgba(255, 239, 239, 1)',
              name: '에럿2',
              date: new Date().setDate(28),
            },
            {
              color: 'rgba(255, 239, 239, 1)',
              name: '에럿2',
              date: new Date().setDate(28),
            },
            {
              color: 'rgba(255, 239, 239, 1)',
              name: '에럿2',
              date: new Date().setDate(28),
            },
            {
              color: 'rgba(255, 239, 239, 1)',
              name: '에럿2',
              date: new Date().setDate(28),
            },
            {
              color: 'rgba(255, 239, 239, 1)',
              name: '에럿2',
              date: new Date().setDate(28),
            },
            {
              color: 'rgba(255, 239, 239, 1)',
              name: '에럿2',
              date: new Date().setDate(28),
            },
            {
              color: 'rgba(255, 239, 239, 1)',
              name: '에럿2',
              date: new Date().setDate(28),
            },
            {
              color: 'rgba(255, 239, 239, 1)',
              name: '에럿2',
              date: new Date().setDate(28),
            },
            {
              color: 'rgba(255, 239, 239, 1)',
              name: '에럿2',
              date: new Date().setDate(28),
            },
            {
              color: 'rgba(255, 239, 239, 1)',
              name: '에럿2',
              date: new Date().setDate(28),
            },
            {
              color: 'rgba(255, 239, 239, 1)',
              name: '에럿2',
              date: new Date().setDate(28),
            },
          ]}
        />
      </div>
      <Checkbox id="test1">테스트1</Checkbox>
      <Checkbox id="test2" defaultChecked>
        테스트2
      </Checkbox>
      <Checkbox id="test3" disabled>
        테스트 disabled
      </Checkbox>
    </div>
  )
}

export default MainView

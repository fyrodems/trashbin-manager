/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react'
import { Pie, measureTextWidth, type PieConfig } from '@ant-design/plots'
import { Radio, type RadioChangeEvent } from 'antd'
import {
  type WidthAndHightObjectType,
  type DonutChartProps,
  type TargetValueRadioChangeEventType,
  type ChartDataType,
} from './interfaces'
import { garbageUnitConverter } from '@/utils/garbage'
import { isMobileWidth } from '@/utils/functions'

export const DonutChart: React.FC<DonutChartProps> = ({ chartData }) => {
  const [unit, setUnit] = useState<string>('kg')

  const onChange = (event: RadioChangeEvent) => {
    const { value } = event.target as TargetValueRadioChangeEventType
    setUnit(value)
  }

  function renderStatistic(
    containerWidth: number,
    text: string,
    style: Record<string, string>
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const { width: textWidth, height: textHeight } = measureTextWidth(
      text,
      style
    ) as WidthAndHightObjectType
    const R = containerWidth / 2

    let scale = 1

    if (containerWidth < textWidth) {
      scale = Math.min(
        Math.sqrt(Math.abs(R ** 2 / ((textWidth / 2) ** 2 + textHeight ** 2))),
        1
      )
    }

    const textStyleStr = `width:100%;`
    return `<div style="${textStyleStr};white-space:wrap;font-size:${scale}em;line-height:${
      scale < 1 ? 1 : 'inherit'
    };">${text}</div>`
  }

  const data = chartData.garbageTypes.map(({ type, mass }) => {
    return {
      type,
      value: garbageUnitConverter(unit, mass),
    }
  })

  const colorsMap = chartData.garbageTypes.map(({ color }) => color)

  // Pokaż Radio.Group, jeśli jednostka to 't' lub waga jest większa lub równa 1 000 kg
  const shouldShowRadioGroup = unit === 't' || chartData.total >= 1_000_000

  const config: PieConfig = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    color: colorsMap,
    radius: isMobileWidth() ? 0.7 : 0.9,
    innerRadius: 0.6,
    label: false,
    legend: {
      layout: 'vertical',
      position: 'right',
      flipPage: false,
      offsetX: -20,
      offsetY: 0,
    },
    statistic: {
      title: {
        offsetY: 0,
        style: {
          fontSize: isMobileWidth() ? '16px' : '26px',
          textAlign: 'center',
        },
        customHtml(
          container: HTMLDivElement,
          _view: any,
          datum: ChartDataType
        ) {
          const { width, height } = container.getBoundingClientRect()
          const d = Math.sqrt((width / 2) ** 2 + (height / 2) ** 2)
          const text = datum ? datum.type : 'Suma'
          return renderStatistic(d, text, { textAlign: 'center' })
        },
      },
      content: {
        offsetY: isMobileWidth() ? -5 : 10,
        style: {
          fontSize: isMobileWidth() ? '16px' : '26px',
          height: '10%',
        },
        customHtml(
          container: HTMLDivElement,
          _view: any,
          datum: ChartDataType,
          data: Array<Record<string, number>>
        ) {
          const { width } = container.getBoundingClientRect()
          if (!datum) {
            const totalValue = data.reduce(
              (r: number, d: Record<string, number>) => r + d.value,
              0
            )

            return `${totalValue.toFixed(2)} ${unit}`
          }

          const parsedValue = Number(datum?.value).toFixed(2)
          const text =
            unit === 'g' ? `${datum?.value} ${unit}` : `${parsedValue} ${unit}`

          return renderStatistic(width, text, { height: '' })
        },
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
      {
        type: 'pie-statistic-active',
      },
    ],
  }

  return (
    <div
      data-chart-type="donut"
      style={{
        marginBottom: '0px',
        marginLeft: '-20px',
      }}
    >
      {shouldShowRadioGroup && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '12px',
          }}
        >
          <span
            style={{ fontSize: '16px', display: 'inline', fontWeight: '400' }}
          >
            Pokaż w:
          </span>
          <Radio.Group
            options={[
              { label: 'Kilogramach', value: 'kg' },
              { label: 'Tonach', value: 't' },
            ]}
            onChange={onChange}
            value={unit}
            optionType="button"
          />
        </div>
      )}

      <Pie {...config} />
    </div>
  )
}

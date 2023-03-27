import React from "react";

const colors = ["green", "red", "blue", "black"] as const;
type Color = typeof colors[number];

interface Param {
  id: number;
  name: string;
  type: "text" | "number" | "select";
  values?: string;
}
interface State {
  paramValues: ParamValue[];
  colors: Color[];
}

interface ParamValue {
  paramId: number;
  value: string;
}
interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}
interface Props {
  params: Param[];
  model: Model;
}
export const params: Param[] = [
  {
    id: 0,
    name: "Название",
    type: "text",
  },
  {
    id: 1,
    name: "Назначение",
    type: "text",
  },
  {
    id: 2,
    name: "Формат длины",
    type: "text",
  },
  {
    id: 3,
    name: "Пол",
    type: "select",
    values: "муж, жен",
  },
  {
    id: 6,
    name: "Категория",
    type: "select",
    values: "одежда, игрушки, аксессуары",
  },
  {
    id: 7,
    name: "Бренд",
    type: "select",
    values: "TopShop, bestWear, KingShop",
  },
  {
    id: 4,
    name: "Длина",
    type: "number",
  },
  {
    id: 5,
    name: "Ширина",
    type: "number",
  },
];

export const model: Model = {
  paramValues: [
    {
      paramId: 0,
      value: "Кофта Balenciaga, 2023",
    },
    {
      paramId: 1,
      value: "повседневное",
    },
    {
      paramId: 2,
      value: "макси",
    },
    {
      paramId: 3,
      value: "жен",
    },
    {
      paramId: 4,
      value: "30",
    },
    {
      paramId: 5,
      value: "50",
    },
    {
      paramId: 6,
      value: "одежда",
    },
    {
      paramId: 7,
      value: "TopShop",
    },
  ],
  colors: ["red", "green"],
};
export default class ParamEditor extends React.Component<Props, State> {
  state: Model = {
    paramValues: this.props.model.paramValues,
    colors: this.props.model.colors,
  };

  private handleChange = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const paramId = Number(target.dataset.id);
    const index = this.state.paramValues.findIndex(
      (el) => el.paramId === paramId
    );
    const newParamValues = this.state.paramValues;
    newParamValues[index] = {
      ...newParamValues[index],
      value: target.value,
    };
    this.setState({ ...this.state, paramValues: newParamValues });
  };
  private handleChangeColor = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    if (!target.checked) {
      const newColors = this.state.colors.filter((el) => el !== target.value);
      this.setState({ ...this.state, colors: newColors });
    } else {
      const newColors = this.state.colors;
      newColors.push(target.value as Color);
      this.setState({ ...this.state, colors: newColors });
    }
  };
  private handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log(this.getModel());
  };
  public getModel(): Model {
    return this.state;
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="form">
        {this.props.params.map((param) => {
          const value = model.paramValues.filter(
            (el) => el.paramId === param.id
          )[0].value;
          switch (param.type) {
            case "text":
            case "number":
              return (
                <div key={param.id} className="row">
                  <label className="label">{param.name}</label>
                  <input
                    type={param.type === "text" ? "text" : "number"}
                    value={value}
                    data-id={param.id}
                    onChange={this.handleChange}
                  ></input>
                </div>
              );
            case "select":
              return (
                <div key={param.id} className="row">
                  <label className="label">{param.name}</label>
                  <select
                    name={param.name}
                    defaultValue={value}
                    data-id={param.id}
                    onChange={this.handleChange}
                  >
                    {param.values &&
                      param.values.split(", ")?.map((value, index) => (
                        <option key={index} value={value}>
                          {value}
                        </option>
                      ))}
                  </select>
                </div>
              );

            default:
              break;
          }
        })}
        {colors.map((color, index) => (
          <div key={index} className="row">
            <label className="label">{color}</label>

            <input
              type="checkbox"
              value={color}
              checked={this.state.colors.includes(color)}
              onChange={this.handleChangeColor}
            />
          </div>
        ))}
        <input type="submit" value="Print model to console" />
      </form>
    );
  }
}

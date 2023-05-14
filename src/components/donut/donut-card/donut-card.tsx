import { FC } from "react";
import { DonutCardStyled } from "components/donut/donut-card/donut-card-styled";
import { useDonutUi } from "logic/ui/use-donut-ui";
import { TDonut } from "@/types/model";

export const DonutCard: FC<{ donut: TDonut }> = ({ donut }) => {
	const { showDonut } = useDonutUi(donut);

	const onShowDonut = () => {
		showDonut();
	};
	return <DonutCardStyled donut={donut} onDonutClick={onShowDonut} />;
};

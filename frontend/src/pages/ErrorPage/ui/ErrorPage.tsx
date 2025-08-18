import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Button,
} from "@mui/material";
import cn from "classnames";
import { type FC, useState } from "react";
import { useTranslation } from "react-i18next";

import styles from "./ErrorPage.module.scss";

interface Props {
	error?: Error;
}

const ErrorPage: FC<Props> = ({ error }) => {
	const { t } = useTranslation();
	const [expanded, setExpanded] = useState(false);

	const reloadPage = () => {
		location.reload();
	};

	const copyError = async () => {
		if (error) {
			await navigator.clipboard.writeText(error.stack || error.message);
		}
	};

	return (
		<div className={cn(styles.pageErrorWrapper)}>
			<div className={cn(styles.pageErrorContent)}>
				<p className={cn(styles.pageErrorTitle)}>
					{t("exceptions.just-error")}
				</p>

				{error && (
					<div className={cn(styles.errorDetails)}>
						<Accordion
							expanded={expanded}
							onChange={() => {
								setExpanded(!expanded);
							}}
						>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								{t("exceptions.details")}
							</AccordionSummary>
							<AccordionDetails>
								<pre className={cn(styles.errorStack)}>
									{error.stack || error.message}
								</pre>
								<Button
									startIcon={<ContentCopyIcon />}
									sx={{ mt: 1 }}
									variant="outlined"
									onClick={copyError}
								>
									{t("buttons.copy-error")}
								</Button>
							</AccordionDetails>
						</Accordion>
					</div>
				)}

				<Button sx={{ mt: 3 }} variant="contained" onClick={reloadPage}>
					{t("buttons.reload-page")}
				</Button>
			</div>
		</div>
	);
};

export default ErrorPage;

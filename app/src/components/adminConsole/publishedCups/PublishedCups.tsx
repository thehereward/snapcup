import React, { useState, useEffect, useCallback } from "react";
import { SectionHeaderUnderline } from "../AdminConsoleStyles";
import PublishedCupsHeader from "./PublishedCupsHeader";
import PublishedCupsList from "./PublishedCupsList";
import Cup from "../../../types/Cup";
import { Entity } from "../../../types/Entity";

const PublishedCups: React.FunctionComponent = (props: {
    cups: Entity<Cup>[];
}) => {
    return (
        <div className="PublishedCups">
            <PublishedCupsHeader />
            <SectionHeaderUnderline />
            <PublishedCupsList cups={props.cups} />
        </div>
    );
};

export default PublishedCups;
